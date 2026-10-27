import { useEffect, useId, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { isValidPhone } from "@/utils/validation";

export default function LoginDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      className="stitch-dialog fixed inset-0 bg-black/60 z-50 items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-7 relative shadow-2xl">
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 min-h-11 min-w-11"
          aria-label="Đóng đăng nhập"
          onClick={() => dialogRef.current?.close()}
        >
          <Icon name="fa-xmark" className="stitch-icon text-lg" />
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl mx-auto mb-2 border border-amber-200">
            <Icon name="fa-user-check" className="stitch-icon" />
          </div>
          <h2
            id={`${id}-title`}
            className="text-lg font-black text-slate-900 uppercase"
          >
            Đăng Nhập GOMOVE
          </h2>
          <p className="text-xs text-slate-500">
            Tra cứu lịch sử đặt xe và tích điểm đổi quà
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            if (!isValidPhone(String(data.get("phone") ?? ""))) {
              setNotice("Vui lòng nhập số điện thoại Việt Nam hợp lệ.");
              return;
            }
            setNotice(
              "Chưa kết nối dịch vụ đăng nhập. Vui lòng liên hệ hotline để được hỗ trợ.",
            );
          }}
        >
          <div>
            <label
              htmlFor={`${id}-phone`}
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Số điện thoại
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="username"
              required
              placeholder="Nhập số điện thoại đã đặt xe..."
              className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-password`}
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Mật khẩu / Mã OTP
            </label>
            <input
              id={`${id}-password`}
              type="password"
              autoComplete="current-password"
              required
              placeholder="Nhập mật khẩu của bạn..."
              className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-600">
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-amber-500"
              />
              Ghi nhớ đăng nhập
            </label>
            <button
              type="button"
              className="text-brand-red font-semibold hover:underline"
              onClick={() =>
                setNotice("Chức năng khôi phục tài khoản chưa được kết nối.")
              }
            >
              Quên mật khẩu?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-brand-red hover:bg-red-700 text-white font-bold text-xs uppercase rounded-xl shadow-md transition"
          >
            Đăng nhập ngay
          </button>
          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              className="text-sky-600 font-bold hover:underline"
              onClick={() =>
                setNotice("Chức năng đăng ký tài khoản chưa được kết nối.")
              }
            >
              Đăng ký tài khoản GOMOVE
            </button>
          </div>
          <p role="status" className="text-xs text-slate-600">
            {notice}
          </p>
        </form>
      </div>
    </dialog>
  );
}
