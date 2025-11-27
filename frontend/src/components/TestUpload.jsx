import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';

const TestUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log('File selected:', selectedFile);
    };

    const testUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fullName', 'Test User');
        formData.append('email', 'test@example.com');
        formData.append('phoneNumber', '1234567890');
        formData.append('bio', 'Test bio');
        formData.append('skills', 'Test skills');

        try {
            setLoading(true);
            console.log('Starting upload test...');

            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            console.log('Upload response:', res.data);
            setUploadResult(res.data);

            if (res.data.success && res.data.user?.profile?.resume) {
                // Test opening the uploaded file
                window.open(res.data.user.profile.resume, '_blank');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadResult(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Test CV Upload</h3>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>

            <button
                onClick={testUpload}
                disabled={loading || !file}
                style={{
                    padding: '10px 20px',
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Uploading...' : 'Test Upload'}
            </button>

            {uploadResult && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Upload Result:</h4>
                    <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                        {JSON.stringify(uploadResult, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TestUpload;