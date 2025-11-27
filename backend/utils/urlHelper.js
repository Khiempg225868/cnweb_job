// Convert Cloudinary image URL to raw URL for PDFs
export const convertToRawUrl = (imageUrl) => {
    if (!imageUrl) return imageUrl;

    // If it's already a raw URL, return as is
    if (imageUrl.includes('/raw/upload/')) {
        return imageUrl;
    }

    // Convert image URL to raw URL for PDF files
    if (imageUrl.includes('/image/upload/')) {
        return imageUrl.replace('/image/upload/', '/raw/upload/');
    }

    return imageUrl;
};

// Generate direct download URL for PDFs
export const generatePdfViewUrl = (cloudinaryUrl) => {
    if (!cloudinaryUrl) return cloudinaryUrl;

    // Convert to raw URL first
    let rawUrl = convertToRawUrl(cloudinaryUrl);

    // Add fl_attachment flag to force download instead of inline view
    if (rawUrl.includes('/upload/')) {
        rawUrl = rawUrl.replace('/upload/', '/upload/fl_attachment/');
    }

    return rawUrl;
};