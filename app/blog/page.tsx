import BlogsCards from "@/components/BlogsCards";
import FirstBlog from "@/components/FirstBlog";
import HeroSection from "@/components/HeroSection";
import SearchBlogs from "@/components/SearchBlogs";

export default function Home() {
  return (
    <>
      <HeroSection
        breadCrumpTitle={"Blog"}
        title={"Blog"}
        slogan={"Explore the latest trends and insights in real estate."}
      />
      <SearchBlogs />
      <FirstBlog image="/defaultBlog.webp" />
      <BlogsCards />
    </>
  );
}
