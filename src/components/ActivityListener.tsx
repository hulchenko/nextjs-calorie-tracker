"use client";

import { useEffect, useRef } from "react";

const ActivityListener = () => {
  const clicks = useRef(0); // useState does not work here for some reason

  useEffect(() => {
    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("click", handleUserActivity); // Clean up event listener
    };
  }, []);

  const handleUserActivity = async () => {
    clicks.current += 1;
    const count = clicks.current;

    if (count > 5) {
      // update session after 5 interactive clicks
      await updateSession();
      clicks.current = 0; // Reset clicks count
    }
  };

  const updateSession = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
      });
      if (response.ok) {
        console.log("Updating session...");
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  return null;
};

export default ActivityListener;
