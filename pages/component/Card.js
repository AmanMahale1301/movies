import React from "react";

const Card = ({ data }) => {
  console.log(data);
  return (
    <div
      class="max-w-sm rounded overflow-hidden border-2 border-yellow-200 m-4"
      key={data._id}
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{data.originalTitleText.text}</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
};

export default Card;
