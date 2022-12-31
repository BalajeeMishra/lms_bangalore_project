import React from 'react'
import { useEffect, useState } from 'react';
import PaginationTable from '../src/components/PaginationTable';
import FacultyService from './api/faculty.service';
import FacLayout from './faculty';

const columns = [
  {
    dataField: "user__first_name",
    text: "First Name",
    sort: true
  },
  {
    dataField: "user__last_name",
    text: "Last Name"
  },
  {
    dataField: "user__username",
    text: "Email ID"
  },
  {
    dataField: "qualification",
    text: "Qualification "
  },
  {
    dataField: "experience",
    text: "Experience"
  }
];

const StudentList = () => {

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    FacultyService.listStudents().then(res => {
      if (res && res.data && res.data.data) {
        setStudentList(res.data.data)
      }
    })
  }, [])


  let studentList_ = [];
  if (studentList) {
    studentList.forEach((element, idx) => {
      studentList_.push(
        <tr key={element.user__id}>
          <th scope="row">{idx + 1}</th>
          <td>{element.user__first_name}</td>
          <td>{element.user__last_name}</td>
          <td>{element.user__username}</td>
          <td>NA</td>
          <td>NA</td>
          <td><i className="fas fa-edit"></i></td>
        </tr>)
    });
  }

  return (
    <FacLayout>
      <p className='title-db'>HOME / STUDENTS</p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="bg-layout wow fadeInUp delay-0-2s" >
              {studentList.length > 0 ?
                <div className="content">
                  <h4>View / Edit Students</h4>
                  <div className="row">

                    <PaginationTable data={studentList} columns={columns} />
                  </div>
                </div>
                : <div className='container'><h4>No Students enrolled in your courses</h4></div>
              }
            </div>
          </div>
        </div>
      </div>
    </FacLayout>
  )
}

export default StudentList;