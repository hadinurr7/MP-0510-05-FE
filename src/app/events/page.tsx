// "use client";
// import { Badge } from "@/components/ui/badge";
// import useGetBlog from "@/hooks/api/blog/useGetBlog";
// import { format } from "date-fns";
// import Image from "next/image";
// import { FC } from "react";
// import SkeletonBlog from "./components/Skeleton";
// import Markdown from "@/components/Markdown";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// interface BlogDetailPageProps {
//   blogId: number;
// }
// const BlogDetailPage: FC<BlogDetailPageProps> = ({ blogId }) => {
//   const { data, isPending } = useGetBlog(blogId);

//   if (isPending) {
//     return <SkeletonBlog />;
//   }

//   if (!data) {
//     return <h1>no data</h1>;
//   }
//   return (
//     <div className="container mx-auto max-w-5xl px-4">
//       <section className="mb-4 mt-2 space-y-3">
//         <Badge>{data.category}</Badge>
//         <h1 className="text-3xl font-semibold">{data.title}</h1>
//         <div className="flex items-center justify-between">
//           <p>
//             {format(new Date(), "dd MMM YYY")} - {data.user.name}{" "}
//           </p>

//           <Button variant="outline" size="icon">
//             <Trash2 />
//           </Button>
//         </div>
//         <div className="relative h-[400px]">
//           <Image
//             src={data.thumbnail}
//             alt="thumbnail"
//             fill
//             className="object-cover"
//           />
//         </div>
//       </section>
//       <Markdown content={data.content} />
//     </div>
//   );
// };

// export default BlogDetailPage;
