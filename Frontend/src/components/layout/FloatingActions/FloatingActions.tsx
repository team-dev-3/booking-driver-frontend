import Icon from "@/components/common/Icon/Icon";

export default function FloatingActions() {
  return (
    <>
      {" "}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a
          className="w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center text-xl shadow-xl transition transform hover:scale-110"
          href="https://zalo.me/0816665599"
          target="_blank"
          title="Chat Zalo"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
        >
          <Icon name="fa-comment-dots" className="stitch-icon " />
        </a>
        <a
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center text-xl shadow-xl transition transform hover:scale-110 animate-bounce"
          href="tel:0816665599"
          title="Gọi ngay 081 666 5599"
          aria-label="Gọi ngay 081 666 5599"
        >
          <Icon name="fa-phone" className="stitch-icon " />
        </a>
      </div>{" "}
      <button
        className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center text-sm shadow-md transition"
        title="Về đầu trang"
        type="button"
        aria-label="Về đầu trang"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
      >
        <Icon name="fa-chevron-up" className="stitch-icon " />
      </button>{" "}
    </>
  );
}
