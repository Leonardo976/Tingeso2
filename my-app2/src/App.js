import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExamComponent from './components/ExamComponent';
import HomeComponent from './components/HomeComponent';
import GenerateFeeComponent from './components/GenerateFeeComponent';
import NewStudentComponent from './components/NewStudentComponent';
import StudentListComponent from './components/StudentListComponent';
import FeeListComponent from './components/FeeListComponent';
import ReportSummaryComponent from './components/ReportSummaryComponent';
import DiscountComponent from './components/DiscountComponent';
import FileInformationComponent from './components/FileInformationComponent';
import DeleteAllComponent from './components/DeleteAllComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomeComponent />} />
          <Route path = "/file-upload" element={<ExamComponent />} />
          <Route path = "/new-student" element={<NewStudentComponent />} />
          <Route path = "/generate-fees" element={<GenerateFeeComponent />} />
          <Route path = "/students" element={<StudentListComponent />}></Route>
          <Route path = "/list-fees" element={<FeeListComponent/>}></Route>
          <Route path = "/report-summary" element={<ReportSummaryComponent/>}></Route>
          <Route path = "/discounts" element={<DiscountComponent/>}></Route>
          <Route path = "/file-information" element = {<FileInformationComponent/>}></Route>
          <Route path = "/delete-all" element = {<DeleteAllComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
