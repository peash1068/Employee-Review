<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\tbl_empModel;
use App\tbl_reviewModel;
use App\tbl_assignmentModel;

use DB;

class LoginController extends Controller
{
    public function login()
    {
        $inputs = request()->input();

        $username = $inputs['username'];
        $password = $inputs['password'];

        $result = tbl_empModel::where('emp_name', $username)
            ->where('password', $password)->get();
        if ($result) {
            foreach ($result as $row) {
                return ['code' => 200, 'role' => $row['role'], 'id' => $row['id']];
            }
        } else {
            return ['code' => 201, 'role' => ''];      // No such Login
        }

    }

    public function getEmpList()
    {
        $result = tbl_empModel::get();
        $res = array();
        if ($result) {
            foreach ($result as $row)
                $res[] = $row;
        }
        return $res;

    }

    public function deleteEmp()
    {
        $inputs = request()->input();
        $result = tbl_empModel::where('id', $inputs['id'])->delete();
        if ($result)
            return ['code' => 200, 'msg' => 'success'];
        else
            return ['code' => 201, 'msg' => 'Error'];


    }

    public function addDelemp()
    {
        $inputs = request()->input();

        if ($inputs['action'] == 'update') {

            $result = tbl_empModel::where('id', $inputs['id'])
                ->update(['emp_name' => $inputs['name'], 'password' => $inputs['password'], 'emp_id' => $inputs['emp_id'], 'role' => $inputs['role']]);
            if ($result) {
                return ['code' => 200, 'msg' => 'success'];
            } else {
                return ['code' => 201, 'msg' => 'Failed'];
            }
        } else if ($inputs['action'] == 'insert') {
            $data = array(
                'emp_name' => $inputs['name'],
                'password' => $inputs['password'],
                'emp_id' => $inputs['emp_id'],
                'role' => $inputs['role']
            );

            $result = tbl_empModel::insert($data);
            if ($result) {
                return ['code' => 200, 'msg' => 'success'];
            } else {
                return ['code' => 201, 'msg' => 'Failed'];
            }

        }

    }

    public function getEmpReview()
    {

        $inputs = request()->input();

        $sql = <<<SQL
        SELECT tbl_review.review,tbl_review.id,tbl_review.rate,tbl_emp.emp_id,tbl_emp.emp_name FROM tbl_review
JOIN tbl_emp ON tbl_review.reviewer_unq_id=tbl_emp.id
WHERE tbl_review.emp_unq_id={$inputs['id']}

SQL;


        $result = DB::select($sql);
        $res = array();
        if ($result) {
            foreach ($result as $row)
                $res[] = $row;
        }
        return $res;
    }

    public function deleteReview()
    {
        $inputs = request()->input();
        $result = tbl_reviewModel::where('id', $inputs['id'])->delete();
        if ($result)
            return ['code' => 200, 'msg' => 'success'];
        else
            return ['code' => 201, 'msg' => 'Error'];

    }

    public function review()
    {
        $inputs = request()->input();

        if ($inputs['action'] == 'update') {
            $result = tbl_reviewModel::where('id', $inputs['id'])
                ->update(['rate' => $inputs['rate'], 'review' => $inputs['review']]);
            if ($result) {
                return ['code' => 200, 'msg' => 'success'];
            } else {
                return ['code' => 201, 'msg' => 'Failed'];
            }

        } else if ($inputs['action'] == 'insert') {
            $result = tbl_reviewModel::insert(['emp_unq_id' => $inputs['emp_unq_id'], 'reviewer_unq_id' => $inputs['reviewer_unq_id'], 'rate' => $inputs['rate'], 'review' => $inputs['review']]);
            if ($result) {
                return ['code' => 200, 'msg' => 'success'];
            } else {
                return ['code' => 201, 'msg' => 'Failed'];
            }
        }

    }

    public function saveAssignment()
    {

        $inputs = request()->input();
        $result = tbl_assignmentModel::where('emp_list', $inputs['employee_list'])
            ->where('assigned_to', $inputs['assigned_to'])->first();
        if ($result) {
            return ['code' => 203, 'msg' => 'already exists'];
        } else {
            $insert = tbl_assignmentModel::insert(['emp_list' => $inputs['employee_list'], 'assigned_to' => $inputs['assigned_to']]);
            if ($insert) {
                return ['code' => 200, 'msg' => 'Success'];
            } else {
                return ['code' => 201, 'msg' => 'Failed'];
            }
        }


    }

    public function getClientEmpList()
    {
        $inputs = request()->input();

        $sql = <<<SQL
        SELECT tbl_emp.* FROM tbl_emp
JOIN tbl_assignment ON tbl_emp.id=tbl_assignment.emp_list
WHERE  assigned_to={$inputs['emp_id']}
     
SQL;

        $result = DB::select($sql);
        $res = array();
        if ($result) {
            foreach ($result as $row)
                $res[] = $row;
        }
        return $res;

    }

    public function getEmpReviewClient()
    {
        $inputs = request()->input();

        $sql = <<<SQL
        SELECT tbl_review.review,tbl_review.id,tbl_review.rate,tbl_emp.emp_id,tbl_emp.emp_name FROM tbl_review
JOIN tbl_emp ON tbl_review.reviewer_unq_id=tbl_emp.id
WHERE tbl_review.emp_unq_id={$inputs['id']} and tbl_review.reviewer_unq_id={$inputs['emp_id']}

SQL;


        $result = DB::select($sql);
        $res = array();
        if ($result) {
            foreach ($result as $row)
                $res[] = $row;
        }
        return $res;

    }

}
