import axios from 'axios';
import { VerdictType } from 'components/StatementEvaluation';

export function loginAPI(email: string, password: string) {
  const data = { email, password };

  return axios.post('/api/editor/login', data);
}

export function reviewAPI(
  reportId: string,
  comment: string,
  verdict: VerdictType,
) {
  const data = {
    reportId,
    comment,
    verdict,
  };

  return axios.post('/api/editor/review', data);
}

export function fetchReportAPI(reportId: string) {
  return axios.get(`/api/editor/report/${reportId}`);
}

export function fetchReportsAPI(
  category: string,
  politician: string,
  dateFrom: string,
  dateTo: string,
) {
  const params = { category, politician, dateFrom, dateTo };

  return axios.get('/api/editor/reports', { params });
}
