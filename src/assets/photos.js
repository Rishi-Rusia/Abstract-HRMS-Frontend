// This path is now correct: it looks for 'images/minan-majid.jpg'
// relative to the current file (photos.js).
import minanMajidPhoto from './images/minan-majid.jpg'; 
import sahilmehrajPhoto from './images/sahil-mehraj.jpg';

/**
 * Object mapping Employee IDs (Number) to their imported photo assets.
 */
export const EmployeePhotos = {
    // Minan Majid (ID: 1)
    1: minanMajidPhoto,
    68: sahilmehrajPhoto,
};