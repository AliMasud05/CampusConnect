import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// interface ProductCardProps {
//   title: string;
//   imageUrl: string;
//   author: {
//     name: string;
//     avatarUrl: string;
//     initials: string;
//   };
//   publishDate: string;
//   readTime: string;
//   description: string;
// }

interface ProductCardProps {
  data: {
    title: string;
    imageUrl: string;
    name: string;
    avatarUrl: string;
    initials: string;
    publishDate: string;
    readTime: number;
    description: string;
    slug?: string;
  };
}

export default function BlogsCard({ data }: ProductCardProps) {
  return (
    <Link href={`/blogs/${data?.slug}`} passHref>
      {" "}
      <Card className="w-full  overflow-hidden border-0 shadow-lg">
        <div className="relative h-80 w-full">
          <Image src={data?.imageUrl || "/placeholder.svg"} alt={data?.title} fill className="object-cover" priority />
        </div>
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-border p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={data?.avatarUrl} alt={data?.name} />
              <AvatarFallback>{data?.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-sm text-[#4E4E4E]">
                <span>By: {data?.name}</span>
                <span className="h-1 w-1 rounded-full bg-rose-500"></span>
                <span>Publish: {data?.publishDate}</span>
                <span className="h-1 w-1 rounded-full bg-rose-500"></span>
                <span>{data?.readTime} min read</span>
              </div>
              <h3 className="text-xl font-bold">{data?.description}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
