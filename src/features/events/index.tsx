// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge, Calendar, LocateIcon, Share2 } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { FC, useEffect, useState } from "react";

// import { cn } from "@/lib/utils";
// import useGetEvent from "@/hooks/api/UseGetEvent";
// import Markdown from "@/components/Markdown";
// import QuantitySelector from "@/components/QuantitySelector";

// interface EventDetailComponentProps {
//   eventId: number;
// }

// const EventDetailComponent: FC<EventDetailComponentProps> = ({ eventId }) => {
//   const { data: event, isLoading: isEventLoading } = useGetEvent(eventId);

//   const [quantity, setQuantity] = useState(1);

//   if (isEventLoading) <h1>loading</h1>;

//   if (!event) {
//     return <h1>Event not found</h1>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-10">
//       <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
//         <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:col-span-2">
//           <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:aspect-[2/1] lg:aspect-[16/9]">
//             <Image
//               src={event.thumbnail}
//               alt={`${event.name} banner`}
//               fill
//               priority
//               className="object-cover transition-transform duration-300 hover:scale-105"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
//             />
//           </div>

//           <div className="space-y-4 sm:space-y-6">
//             <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//               <div className="space-y-2">
//                 <p className="text-sm text-muted-foreground">
//                   {new Intl.DateTimeFormat("en-ID", {
//                     dateStyle: "full",
//                     timeStyle: "short",
//                     timeZone: "Asia/Jakarta",
//                   }).format(new Date(event.startDate))}
//                 </p>
//                 <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
//                   {event.name}
//                 </h1>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon" className="shrink-0">
//                   <Share2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 sm:space-y-6">
//             <Card className="border-zinc-200">
//               <CardHeader className="pb-4">
//                 <h2 className="text-xl font-semibold">Date and Location</h2>
//               </CardHeader>
//               <CardContent className="grid gap-4">
//                 <div className="flex items-start gap-4 rounded-lg bg-muted/50 p-3">
//                   <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//                   <div>
//                     <p className="font-medium">
//                       {new Intl.DateTimeFormat("en-ID", {
//                         dateStyle: "full",
//                         timeStyle: "short",
//                         timeZone: "Asia/Jakarta",
//                       }).format(new Date(event.startDate))}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-zinc-200">
//               <CardHeader className="pb-3">
//                 <h2 className="text-xl font-semibold">About this event</h2>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="prose prose-zinc max-w-none">
//                   <Markdown content={event.description} />
//                 </div>

//                 <div>
//                   <h3 className="mb-2 text-sm font-medium">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     <Badge variant="secondary" className="text-sm">
//                       {event.categoryId}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         <div className="lg:col-span-1">
//           <Card className="sticky top-24 border-zinc-200">
//             <CardContent className="space-y-4 p-4 sm:p-6">
//               <div>
//                 <h2 className="mb-1 text-xl font-semibold">{event.name}</h2>
//                 <p className="text-lg font-bold text-purple-600">
//                   {event.price.toLocaleString("id-ID", {
//                     style: "currency",
//                     currency: "IDR",
//                   })}{" "}
//                   <span className="text-sm font-normal text-muted-foreground">
//                     / pax
//                   </span>
//                 </p>
//               </div>

//               {event.availableSeats > 0 ? (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
//                     <p className="font-medium">Quantity</p>
//                     <QuantitySelector
//                       maxValue={event.availableSeats}
//                       quantity={quantity}
//                       onChangeQuantity={setQuantity}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <div className="relative">
//                       <Input
//                         type="text"
//                         placeholder="Input a Voucher"
//                         value={voucherCode}
//                         onChange={(e) => setVoucherCode(e.target.value)}
//                         disabled={!user || event.price <= 0}
//                         className={cn(
//                           "w-full transition-colors",
//                           isVoucherValid === true && "border-green-500",
//                           isVoucherValid === false && "border-red-500",
//                         )}
//                       />
//                       {isPendingVoucher && (
//                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                           Checking...
//                         </span>
//                       )}
//                     </div>
//                     <p
//                       className={cn(
//                         "text-xs",
//                         isVoucherValid === true && "text-green-500",
//                         isVoucherValid === false && "text-red-500",
//                       )}
//                     >
//                       {voucherMessage}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="relative">
//                       <Input
//                         type="text"
//                         placeholder="Input a Coupon"
//                         value={couponCode}
//                         onChange={(e) => setCouponCode(e.target.value)}
//                         disabled={!user || event.price <= 0}
//                         className={cn(
//                           "w-full transition-colors",
//                           isCouponValid === true && "border-green-500",
//                           isCouponValid === false && "border-red-500",
//                         )}
//                       />
//                       {isPendingCoupon && (
//                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                           Checking...
//                         </span>
//                       )}
//                     </div>
//                     <p
//                       className={cn(
//                         "text-xs",
//                         isCouponValid === true && "text-green-500",
//                         isCouponValid === false && "text-red-500",
//                       )}
//                     >
//                       {couponMessage}
//                     </p>
//                   </div>

//                   <div className="pt-2">
//                     {user && (
//                       <CreateTransactionModal
//                         userId={user.id}
//                         event={event}
//                         quantity={quantity}
//                         voucher={voucherData}
//                         coupon={couponData}
//                       />
//                     )}

//                     {!user && (
//                       <p className="mt-4 text-center text-sm text-muted-foreground">
//                         Please{" "}
//                         <Link
//                           href="/login"
//                           className="text-purple-600 underline underline-offset-2 hover:text-purple-700"
//                         >
//                           Login
//                         </Link>{" "}
//                         to Book Ticket
//                       </p>
//                     )}

//                     {user?.role === "ORGANIZER" && (
//                       <p className="mt-4 text-center text-sm text-muted-foreground">
//                         Please{" "}
//                         <Link
//                           href="/login"
//                           className="text-purple-600 underline underline-offset-2 hover:text-purple-700"
//                         >
//                           Login
//                         </Link>{" "}
//                         as Customer to Book Ticket
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
//                   <p className="font-semibold">Sold Out</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailComponent;
