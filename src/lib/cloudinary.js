const CLOUDINARY_CLOUD_NAME = 'demo';

function buildTransforms(transforms) {
  return transforms.filter(Boolean).join(',');
}

export function cloudinaryImage(publicId, options = {}) {
  const {
    width = 1600,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    extra = [],
  } = options;

  const transforms = buildTransforms([
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    gravity ? `g_${gravity}` : null,
    ...extra,
  ]);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function cloudinaryVideo(publicId, options = {}) {
  const {
    width = 1920,
    height = 1080,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    extra = [],
  } = options;

  const transforms = buildTransforms([
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    ...extra,
  ]);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transforms}/${publicId}`;
}
