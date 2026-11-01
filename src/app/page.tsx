import Banner from "@/components/home/Banner";
import FeaturesSection from "@/components/home/FeaturesSection";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";
 
export default function Home() {
  return (
     <>
     <Banner />
     <FeaturesSection />
     <RecentUpcomingEvents />
     <GallerySection />
     <NewsletterSection />
     </>
  );
}
