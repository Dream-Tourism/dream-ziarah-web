"use client";

import { memo } from "react";
import { reviewsSchema } from "./reviews-data";

const ReviewsSchema = memo(function ReviewsSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewsSchema),
      }}
    />
  );
});

export default ReviewsSchema;
