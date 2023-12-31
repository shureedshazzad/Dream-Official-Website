//export const BASE_URL = process.env.NODE_ENV === 'development' ? 
//http://localhost:5000' : '';


export const BASE_URL = '';// localhost:5000
export const SEND_VIA_TELEGRAM_SCREEN_URL = `${BASE_URL}/sendviatelegramscreen`;
export const DONOR_URL = '/api/donors';
export const UPLOAD_URL = '/api/upload';
export const BLOOD_REQ_URL = '/api/publicbloodrequest';
export const DOCTOR_URL = '/api/doctors';
export const APPOINTMENT_URL = '/api/appointments';
export const EVENT_URL = '/api/events';
export const PRIVATE_BLOOD_REQ_URL = '/api/privateBloodRequest';