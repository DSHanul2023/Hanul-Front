/*export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ data: res.body });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
}}*/
// api/inquiry.js

const apiUrl = 'http://43.201.180.174:8080/api/inquiry';

/*export const retrieveInquiryList = async () => {
    try {
        const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwMTkyNTU4LCJleHAiOjE2OTAyNzg5NTgsImlkIjoiMmM5NDgxMWM4OTg3NGU5NDAxODk4NzRlZDU0NzAwMDAifQ.i7gb1Qv_Q46HyYptP65wg903m5psJ_xw1QBkzd0PuQ4`
                }
        });

        if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
        }

        const inquiries = await response.json();
        console.log("1"+inquiries);
        return inquiries.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};*/
