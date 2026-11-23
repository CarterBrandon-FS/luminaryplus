import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationBell() {
  // set it so its closed when on the page
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  //   Wraps bell so we can tell if click has happened
  const wrapperRef = useRef(null);

  //   Closes pop up box
  // when the user clicks outside the box it closes the pop up
  useEffect(() => {
    if (!isBoxOpen) return;

    function handleOutside(event) {
      // if target isnt inside the wrapper then close the box
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsBoxOpen(false);
      }
    }
    function handleKey(event) {
      if (event.key === "Escape") setIsBoxOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);

    // Some clean up so the listeners arent just there after closing
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isBoxOpen]);

  return (
    <div className="notif-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="notif-bell"
        aria-label="Notifications"
        aria-expanded={isBoxOpen}
        onClick={() => setIsBoxOpen((v) => !v)}
      >
        <FaBell />
      </button>

      {/* Only opens the render panel when its actually open */}

      {isBoxOpen && (
        <div className="notif-panel" role="dialog" aria-label="Notifications">
          <div className="notif-panel-header">
            <h3>Notifications</h3>
          </div>
          <p className="notif-empty">No notifications</p>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
