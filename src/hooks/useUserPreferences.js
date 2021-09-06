export default function useUserPreferences() {
  const announcementVisible = () => {
    const announcement = window.localStorage?.getItem('announcement');
    if (!announcement) return true;
    return JSON.parse(announcement);
  };

  const dismissAnnouncement = () =>
    window.localStorage?.setItem('announcement', JSON.stringify(false));

  return {
    announcementVisible,
    dismissAnnouncement,
  };
}
