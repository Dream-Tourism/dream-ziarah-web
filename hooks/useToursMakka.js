import { useGetContentsAndImagesByMenuIdQuery } from "@/features/image/imageApi";
import convertCurrency from "@/utils/currency";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const singleTourInfo = {
  "Madinah City Ziarah Vehicle Sharing With Guide": {
    location: "Madinah, Saudi Arabia",
    numberOfReviews: "55",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Start your Madinah tour with an easy pickup from Silver Karam Hotel. Be there on time, and our guide will meet you and take you to the tour vehicle. To help us leave on time, please arrive 15 minutes early. This way, we can get going quickly and begin our journey through the city's history.",
    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
  },
  "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)": {
    location: "Madinah, Saudi Arabia",
    numberOfReviews: "78",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-3",
    departure:
      "Start your Madinah tour with an easy pickup from Silver Karam Hotel. Be there on time, and our guide will meet you and take you to the tour vehicle. To help us leave on time, please arrive 15 minutes early. This way, we can get going quickly and begin our journey through the city's history.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
  },
  "Madinah City Ziarah Luxury Private Vehicle With Guide (5 Person Family)": {
    location: "Madinah, Saudi Arabia",
    numberOfReviews: "98",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "4-5",
    departure:
      "Start your Madinah tour with an easy pickup from Silver Karam Hotel. Be there on time, and our guide will meet you and take you to the tour vehicle. To help us leave on time, please arrive 15 minutes early. This way, we can get going quickly and begin our journey through the city's history.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
  },
  "Madinah City Ziarah Luxury Private Vehicle With Guide (10 Person Group)": {
    location: "Madinah, Saudi Arabia",
    numberOfReviews: "75",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "6-10",
    departure:
      "Start your Madinah tour with an easy pickup from Silver Karam Hotel. Be there on time, and our guide will meet you and take you to the tour vehicle. To help us leave on time, please arrive 15 minutes early. This way, we can get going quickly and begin our journey through the city's history.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
  },
  "Madinah City Ziarah Luxury Private Vehicle With Guide (15 Person Large Group)":
    {
      location: "Madinah, Saudi Arabia",
      numberOfReviews: "58",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "11-15",
      departure:
        "Start your Madinah tour with an easy pickup from Silver Karam Hotel. Be there on time, and our guide will meet you and take you to the tour vehicle. To help us leave on time, please arrive 15 minutes early. This way, we can get going quickly and begin our journey through the city's history.",

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
    },
  "Madinah City Ziarah Luxury Private Vehicle Without Guide (3 Person Luxury)":
    {
      location: "Madinah, Saudi Arabia",
      numberOfReviews: "63",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "1-50",
      departure: `For your private tour experience, enjoy the convenience of being picked up from any location within a 9 km radius of "Silver Karam Hotel". Our driver will meet you at your chosen spot and time, ensuring a personalized and seamless start to your journey through Madinah. To ensure a timely departure, we recommend being ready to go 15 minutes before your scheduled pickup time. This exclusive service is tailored for comfort, privacy, and a deep dive into the city's spiritual heritage`,

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
    },
  "Madinah City Ziarah Luxury Private Vehicle Without Guide (5 Person Family)":
    {
      location: "Madinah, Saudi Arabia",
      numberOfReviews: "57",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "1-50",
      departure: `For your private tour experience, enjoy the convenience of being picked up from any location within a 9 km radius of "Silver Karam Hotel". Our driver will meet you at your chosen spot and time, ensuring a personalized and seamless start to your journey through Madinah. To ensure a timely departure, we recommend being ready to go 15 minutes before your scheduled pickup time. This exclusive service is tailored for comfort, privacy, and a deep dive into the city's spiritual heritage`,

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
    },
  "Madinah City Ziarah Luxury Private Vehicle Without Guide (10 Person Group)":
    {
      location: "Madinah, Saudi Arabia",
      numberOfReviews: "48",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "1-50",
      departure: `For your private tour experience, enjoy the convenience of being picked up from any location within a 9 km radius of "Silver Karam Hotel". Our driver will meet you at your chosen spot and time, ensuring a personalized and seamless start to your journey through Madinah. To ensure a timely departure, we recommend being ready to go 15 minutes before your scheduled pickup time. This exclusive service is tailored for comfort, privacy, and a deep dive into the city's spiritual heritage`,

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
    },
  "Madinah City Ziarah Luxury Private Vehicle Without Guide (15 Person Large Group)":
    {
      location: "Madinah, Saudi Arabia",
      numberOfReviews: "78",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "1-50",
      departure: `For your private tour experience, enjoy the convenience of being picked up from any location within a 9 km radius of "Silver Karam Hotel". Our driver will meet you at your chosen spot and time, ensuring a personalized and seamless start to your journey through Madinah. To ensure a timely departure, we recommend being ready to go 15 minutes before your scheduled pickup time. This exclusive service is tailored for comfort, privacy, and a deep dive into the city's spiritual heritage`,

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16JMCA7nUudCaJJgUFhUvJPH3oVCX5-Q&ehbc=2E312F",
    },

  "Day Trip From Makkah To Taif Vehicle Sharing With Guide": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "63",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Taif Luxury Private Vehicle (3 Person Luxury)": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "33",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-3",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Taif Luxury Private Vehicle (5 Person Family)": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "40",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "4-5",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Taif Luxury Private Vehicle (10 Person Group)": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "64",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "6-10",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Taif Luxury Private Vehicle (15 Person Large Group)":
    {
      location: "Taif, Saudi Arabia",
      numberOfReviews: "58",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "11-15",
      departure:
        "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
    },
  "Day Trip From Makkah To Taif Vehicle Sharing With Guide": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "63",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Taif Luxury Private Vehicle": {
    location: "Taif, Saudi Arabia",
    numberOfReviews: "53",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=16eXCwHVw7NPrJAg9ql7dIuui4h2FyX8&ehbc=2E312F",
  },
  "Day Trip From Makkah To Jeddah Vehicle Sharing With Guide": {
    location: "Jeddah, Saudi Arabia",
    numberOfReviews: "57",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1WmIsOFrqAjll5hM0Bm8EvCZGPzgyVE4&ehbc=2E312F",
  },
  "Day Trip From Makkah To Jeddah Luxury Private Vehicle (3 Person Luxury)": {
    location: "Jeddah, Saudi Arabia",
    numberOfReviews: "60",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-3",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1WmIsOFrqAjll5hM0Bm8EvCZGPzgyVE4&ehbc=2E312F",
  },
  "Day Trip From Makkah To Jeddah Luxury Private Vehicle (5 Person Family)": {
    location: "Jeddah, Saudi Arabia",
    numberOfReviews: "44",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "4-5",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1WmIsOFrqAjll5hM0Bm8EvCZGPzgyVE4&ehbc=2E312F",
  },
  "Day Trip From Makkah To Jeddah Luxury Private Vehicle (10 Person Group)": {
    location: "Jeddah, Saudi Arabia",
    numberOfReviews: "44",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "6-10",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1WmIsOFrqAjll5hM0Bm8EvCZGPzgyVE4&ehbc=2E312F",
  },
  "Day Trip From Makkah To Jeddah Luxury Private Vehicle (15 Person Large Group)":
    {
      location: "Jeddah, Saudi Arabia",
      numberOfReviews: "24",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "11-15",
      departure:
        "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=1WmIsOFrqAjll5hM0Bm8EvCZGPzgyVE4&ehbc=2E312F",
    },
  "Day Trip From Makkah To Jeddah Luxury Private Vehicle": {
    location: "Jeddah, Saudi Arabia",
    numberOfReviews: "61",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/1/embed?mid=1nIIELr6rEaC9U7iIE_8kFC0jItIlC00&ehbc=2E312F&z=10",
  },
  "Makkah City Ziarah Vehicle Sharing With Guide": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "78",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-50",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "45",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-3",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle With Guide (5 Person Family)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "67",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "4-5",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle With Guide (10 Person Group)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "66",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "6-10",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle With Guide (15 Person Large Group)":
    {
      location: "Mecca, Saudi Arabia",
      numberOfReviews: "23",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "11-15",
      departure:
        "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
    },
  "Makkah City Ziarah Luxury Private Vehicle Without Guide (3 Person Luxury)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "56",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "1-3",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle Without Guide (5 Person Family)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "60",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "4-5",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle Without Guide (10 Person Group)": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "56",
    languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
    groupSize: "6-10",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
  },
  "Makkah City Ziarah Luxury Private Vehicle Without Guide (15 Person Large Group)":
    {
      location: "Mecca, Saudi Arabia",
      numberOfReviews: "52",
      languages: "Bengali, English, Hindi, Urdu, Malay, Indonesian.",
      groupSize: "11-15",
      departure:
        "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

      itinerarySrc:
        "https://www.google.com/maps/d/u/2/embed?mid=1JxnAPkia6wFKlyrk_9dIo37DBTyJAoU&ehbc=2E312F",
    },

  "Makkah City Ziarah Luxury Private Vehicle Without Guide": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "65",
    languages: "",
    groupSize: "3-15",
    departure:
      "Our service includes convenient traveler pickup within the Makkah City area, within a distance not exceeding 9 kilometers from your hotel. We are pleased to offer pickup services for all tourists and Umrah pilgrims from their respective hotels. We ensure a timely and efficient pickup process to make your journey as smooth as possible. Please be ready for pickup at your hotel within the specified distance limit in the Makkah City area.",

    itinerarySrc:
      "https://www.google.com/maps/d/u/1/embed?mid=1iqwSAEp3RWgC4awxv4Sh8cZUVDlxW-Q&ehbc=2E312F&z=6",
  },
  "Hajj 2024: Embrace the Divine": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "65",
    languages: "",
    groupSize: "1-42",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1zyUakEQI3Oi8hrnipIJ1Hhkl1NtzG4c&ehbc=2E312F",
  },
  Umrah: {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "57",
    languages: "",
    groupSize: "3-8",
    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1CM8PjQjW7zWc_PpHMpNHHHRYlZU1-cw&ehbc=2E312F",
  },
};

const useToursMakka = (filterTour) => {
  const [tourItems, setTourItems] = useState([]);
  const { menuItems } = useSelector((state) => state?.menus);
  const { currentCurrency } = useSelector((state) => state?.currency);
  const ziarahId = menuItems
    .find((item) => item.name === "Tours")
    ?.children?.find((child) => child?.name == "Makka Tours")?.id;
  const { isSuccess, data, isLoading } =
    useGetContentsAndImagesByMenuIdQuery(ziarahId);

  useEffect(() => {
    if (isSuccess) {
      let tours = data
        .filter((item) => {
          if (
            item.name === "makkah" ||
            item.name === "madinah" ||
            item.name === "jedda" ||
            item.name === "jeddah" ||
            item.name === "tabuk" ||
            item.name === "taif" ||
            item.name == filterTour
          )
            return false;
          return true;
        })
        .map((tour) => ({
          id: tour.id,
          // tag:  tour.id === 10 ? "top rated": tour.id === 9 ? "best seller" : "LIKELY TO SELL OUT*",
          tag: "",
          slideImg: [`${tour.cloudflare_image[0]}`],
          title: tour.name,
          location: singleTourInfo[tour?.name]?.location,
          duration: tour?.duration,
          numberOfReviews: singleTourInfo[tour?.name]?.numberOfReviews,
          price: convertCurrency(
            parseInt(tour?.price),
            "USD",
            currentCurrency?.currency
          ),
          tourType: "Full-day Tours",
          delayAnimation: "100",
          position: tour?.position,
        }));
      tours?.sort((a, b) => a.position - b.position);
      setTourItems(tours);
    }
  }, [isSuccess, currentCurrency]);

  return tourItems;
};

export default useToursMakka;
