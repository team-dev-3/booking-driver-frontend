
const posts = [
  {
    title: "Xe ghép Hà Nội - Vân Đồn: Lựa chọn tiết kiệm, thuận tiện",
    image: "/images/blog/blog1.jpg",
  },
  {
    title: "Xe ghép Hạ Long - Móng Cái: Chủ động hành trình",
    image: "/images/blog/blog2.jpg",
  },
  {
    title: "Xe ghép Hải Phòng - Móng Cái: Hành trình đường dài thuận tiện",
    image: "/images/blog/blog3.jpg",
  },
];

function BlogCard({
  title,
  image,
  large = false,
}: {
  title: string;
  image: string;
  large?: boolean;
}) {
  return (
    <article className="group relative h-full min-h-52 overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute bottom-0 p-5 text-white">
        <span className="text-xs font-semibold text-orange-300">
          KINH NGHIỆM DI CHUYỂN
        </span>
        <h3 className={`mt-2 font-extrabold ${large ? "text-lg" : "text-sm"}`}>
          {title}
        </h3>
      </div>
    </article>
  );
}

export default function BlogSection() {
  return (
    <section id="tin-tuc" className="scroll-mt-28 bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase">
          BẢN TIN <span className="text-orange-600">BLOG & KINH NGHIỆM</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-5">
            <BlogCard {...posts[0]} />
            <BlogCard {...posts[1]} />
          </div>

          <div className="min-h-[445px]">
            <BlogCard {...posts[2]} large />
          </div>
        </div>
      </div>
    </section>
  );
}
