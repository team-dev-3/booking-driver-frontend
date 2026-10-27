import { serviceFares } from './stitch.mock'

/** Tuyến tham khảo từ thiết kế; chưa phải danh mục vận hành qua API. */
export const fixedBookingRoutes = [...new Set(
  Object.values(serviceFares).flatMap(fares => fares.map(fare => fare.route)),
)]
