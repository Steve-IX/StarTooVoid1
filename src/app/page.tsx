import VideoHero from '@/components/VideoHero';
import FeaturedGallery from '@/components/FeaturedGallery';
import BrandStatement from '@/components/BrandStatement';

export default function Home() {
  return (
    <div className="page-transition">
      <VideoHero />
      <FeaturedGallery />
      <BrandStatement />
    </div>
  );
}

