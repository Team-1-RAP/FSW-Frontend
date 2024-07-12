import React from "react";
import Card from "../../components/fragments/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { CardProps } from "./../../components/fragments/Card/types";
import ScoreCard from "../../components/fragments/ScoreCard";

const Profile: React.FC = () => {
  const cards: CardProps[] = [
    {
      variant: "purpleCyan",
      size: "md",
      userFullName: "John Doe",
      userCardExpiration: new Date(),
      userCardNumber: "1234 5678 910",
    },
    {
      variant: "purpleCyan",
      size: "md",
      userFullName: "Adilla Wulandari",
      userCardExpiration: new Date(2028, 10),
      userCardNumber: "1234 5678 910",
    },
    { variant: "purpleCyan", size: "md" },
    // Additional cards can be added here
  ];

  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <Card
              variant={card.variant}
              size={card.size}
              userFullName={card.userFullName}
              userCardNumber={card.userCardNumber}
              userCardExpiration={card.userCardExpiration}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ScoreCard
        imgFile="expense-icon.png"
        title="Saldo Rekening"
        value={1000000}
        isVisible={false}
      />
    </div>
  );
};

export default Profile;
