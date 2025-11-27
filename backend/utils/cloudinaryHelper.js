import {
    v2 as cloudinary
} from 'cloudinary';

// Generate proper URL for different file types
export const getCloudinaryUrl = (publicId, resourceType = 'raw', format = null) => {
    try {
        const options = {
            resource_type: resourceType,
            secure: true,
            sign_url: false, // Don't require authentication
        };

        if (format) {
            options.format = format;
        }

        return cloudinary.url(publicId, options);
    } catch (error) {
        console.error('Error generating Cloudinary URL:', error);
        return null;
    }
};

// Check if file is PDF
export const isPDF = (mimetype) => {
    return mimetype === 'application/pdf';
};

// Get appropriate resource type based on file
export const getResourceType = (mimetype) => {
    if (mimetype.startsWith('image/')) {
        return 'image';
    } else if (mimetype.startsWith('video/')) {
        return 'video';
    } else {
        return 'raw'; // For PDFs and other files
    }
};