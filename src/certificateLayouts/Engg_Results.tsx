import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { format } from "date-fns";

interface Subject {
  PCODE: string;
  PNAME: string;
  CR: number;
  GR: string;
  EXAMMY: string;
  ATTEMPT:string;
}

interface Record {
  SUBJECTS: Subject[];
  SGPA: number;
  CGPA: number;
}

interface Details {
  SNAME: string;
  DOB: string;
  GRP: string;
  ID: string;
  DOJ:Date,
  ENGG_RECORDS: Record[];
  TOTAL_CREDITS:[],
  OBTAINED_CREDITS:[]
}

interface EnggResultsProps {
  details: Details;
}

const EnggResults = ({ details }: EnggResultsProps) => {
  const recentEXAMMY = details.ENGG_RECORDS.reduce(
    (latest: Date | null, sem: any) => {
      sem.SUBJECTS.forEach((subject: any) => {
        const subjectDate = new Date(subject.EXAMMY);
        if (!latest || subjectDate > latest) {
          latest = subjectDate;
        }
      });
      return latest;
    },
    null
  );
  const formattedEXAMMY = recentEXAMMY ? format(recentEXAMMY, "MMM-yyyy") : "N/A"; 



  const sgpa = Array(8).fill(0);
  const cgpa = Array(8).fill(0);
  let prevObtained = 0;
  let prevTotal = 0;

  
  for (let i = 0; i < 8; i++) {
    if (details.TOTAL_CREDITS[i] > 0) {
      prevObtained += details.OBTAINED_CREDITS[i];
      prevTotal += details.TOTAL_CREDITS[i];
      sgpa[i] = parseFloat((details.OBTAINED_CREDITS[i] / details.TOTAL_CREDITS[i]).toFixed(2));
      cgpa[i] = parseFloat((prevObtained / prevTotal).toFixed(2));
    } else {
      sgpa[i] = 0; // Handle division by zero
      cgpa[i] = prevTotal > 0 ? parseFloat((prevObtained / prevTotal).toFixed(2)) : 0;
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: '70px',fontWeight:"bold" }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0, marginLeft: "40px" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "55px" }}>Name</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{details.SNAME}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "55px" }}>Major</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>Bachelor of Technology</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "55px" }}>Branch</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{details.GRP}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0,marginRight:"15px"}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "80px" }}>ID</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{details.ID}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "80px" }}>Admission</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{new Date(details.DOJ).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "80px" }}>Result</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>First Class with Distinction</p>
          </div>
        </div>
      </div>

      {details.ENGG_RECORDS.map((record, index) => {
        const year = Math.floor(index / 2) + 1;
        return (
          <TableContainer
            component={Paper}
            elevation={0}
            key={`sem-${index}`}
            style={{ marginTop: '20px', width: '70%', textAlign: 'center' }}
          >
            <Table sx={{ border: '2px solid black', width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{
                      borderBottom: '2px solid black',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    {year === 1 ? "I" : year === 2 ? "II" : year === 3 ? "III" : "IV"}{" "}
                    {index % 2 === 0 ? "Year I Semester" : "Year II Semester"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'10%' }}><strong>SUBCODE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'50%' }}><strong>SUBNAME</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'10%' }}><strong>CREDITS</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'10%'}}><strong>GRADE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'10%' }}><strong>EXAM DATE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px',width:'10%' }}><strong>ATTEMPT</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.SUBJECTS.map((subject, idx) => (
                  <TableRow key={`subject-${idx}`}>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>
                      {subject.PCODE}
                      </TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px', textAlign:"left",paddingLeft:"80px"}}>
                      {subject.PNAME}
                      </TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>
                      {subject.CR.toFixed(1)}
                    </TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' ,backgroundColor: subject.GR === "R" || subject.GR === "MP" || subject.GR === "Ab" ? 'red' : 'transparent' }} >
                      {subject.GR === "EX" ? subject.GR.charAt(0).toUpperCase() + subject.GR.slice(1).toLowerCase(): subject.GR}
                    </TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{new Date(subject.EXAMMY).toLocaleDateString('en-GB').replace(/\//g, '-')}</TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{subject.ATTEMPT}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ border: '2px solid black', padding: '3px',textAlign:"center" }}><strong>SGPA: {record.SGPA}</strong></TableCell>
                  <TableCell colSpan={2} align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>CGPA: {record.CGPA}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
};

export default EnggResults;
