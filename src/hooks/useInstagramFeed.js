import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = "instagram_feed_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Custom hook to fetch real Instagram posts via the Instagram Graph API.
 *
 * Required env variables (set in .env):
 *   VITE_INSTAGRAM_ACCESS_TOKEN – Long-lived Instagram Graph API token (60-day validity)
 *   VITE_INSTAGRAM_USER_ID      – Instagram Business/Creator account user ID
 *
 * Setup guide:
 *   1. Create a Facebook App at https://developers.facebook.com/
 *   2. Add "Instagram Graph API" product
 *   3. Connect your Instagram Business/Creator account to a Facebook Page
 *   4. Generate a long-lived token via Graph API Explorer
 *   5. Copy the User ID and token into your .env file
 *
 * Token refresh (before 60-day expiry):
 *   GET https://graph.instagram.com/refresh_access_token
 *       ?grant_type=ig_refresh_token&access_token=YOUR_TOKEN
 */
export function useInstagramFeed(limit = 6) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const fetchPosts = useCallback(async () => {
    const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
    const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

    if (!token || !userId) {
      setIsConfigured(false);
      setLoading(false);
      return;
    }

    setIsConfigured(true);

    // Check cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setPosts(data.slice(0, limit));
          setLoading(false);
          return;
        }
      }
    } catch {
      // Cache read failed, fetch fresh
    }

    try {
      setLoading(true);
      setError(null);

      const fields = [
        "id",
        "caption",
        "media_type",
        "media_url",
        "thumbnail_url",
        "permalink",
        "timestamp",
        "like_count",
        "comments_count",
        "media_product_type",
      ].join(",");

      const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          errData?.error?.message || `Instagram API error (${response.status})`,
        );
      }

      const data = await response.json();

      const formatted = (data.data || []).map((item) => ({
        id: item.id,
        caption: item.caption || "",
        mediaType: item.media_type, // IMAGE, VIDEO, CAROUSEL_ALBUM
        imageUrl:
          item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
        likes: item.like_count || 0,
        comments: item.comments_count || 0,
        isVideo: item.media_type === "VIDEO",
        isCarousel: item.media_type === "CAROUSEL_ALBUM",
      }));

      // Cache the results
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: formatted, timestamp: Date.now() }),
        );
      } catch {
        // Cache write failed, continue
      }

      setPosts(formatted);
    } catch (err) {
      console.error("Instagram feed fetch error:", err);
      setError(err.message);

      // Fall back to cached data if available
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          setPosts(data.slice(0, limit));
        }
      } catch {
        // No cache available
      }
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, isConfigured, refetch: fetchPosts };
}
