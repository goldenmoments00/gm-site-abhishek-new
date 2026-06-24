/**
 * Shared client testimonials, used by the packages and gallery pages.
 * Portraits are local assets shipped with the pictlens landing page.
 */

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  detail: string;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "From our first call to receiving our wedding album, the entire experience was seamless and magical. Golden Moment truly understands couples.",
    name: "Rajesh & Sneha",
    detail: "Palace Wedding · Udaipur",
    image:
      "/webflow/pictlens/images/681551fde463c752c7458874_client-01.jpg",
  },
  {
    id: 2,
    quote:
      "Their cinematic approach made our wedding feel like a movie. We relive our special day through their lens, frame by frame.",
    name: "Priya & Aarav",
    detail: "Reception Film · Agartala",
    image:
      "/webflow/pictlens/images/681551fdce1c05adce4ada0d_client-02.jpg",
  },
  {
    id: 3,
    quote:
      "Their responsiveness and professionalism made our destination wedding stress-free. Every detail was perfectly captured and delivered on time.",
    name: "Vikram & Riya",
    detail: "Beach Wedding · Goa",
    image:
      "/webflow/pictlens/images/681551fd79aaad73cb982653_client-03.jpg",
  },
  {
    id: 4,
    quote:
      "The consultation helped us understand exactly what we wanted. The team guided us through every step with patience and expertise.",
    name: "Arjun & Meera",
    detail: "Garden Wedding · Delhi",
    image:
      "/webflow/pictlens/images/681551fdeed03fcec455f0ea_client-04.jpg",
  },
];
