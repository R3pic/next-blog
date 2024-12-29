import type { NextConfig } from 'next';
import withExportImages from 'next-export-optimize-images';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
};

export default withExportImages(nextConfig);
