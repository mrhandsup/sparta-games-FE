import { useEffect, useRef, useState } from "react";
import { TAlarmList } from "../types";
import { userStore } from "../share/store/userStore";

export const useNotifications = () => {
  const [alarms, setAlarms] = useState<TAlarmList[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const { userData } = userStore();

  useEffect(() => {
    if (!userData) return;

    const token = sessionStorage.getItem("accessToken");
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/", ["access_token", token!]);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("알림 웹소켓 연결됨");
    };

    socket.onmessage = (e) => {
      const newAlarm: TAlarmList = JSON.parse(e.data);
      setAlarms((prev) => [newAlarm, ...prev]);
    };

    return () => socket.close();
  }, [userData]);

  // 로그아웃 시 웹소켓 종료
  useEffect(() => {
    if (!userData) {
      socketRef.current?.close();
      socketRef.current = null;
    }
  }, [userData]);

  // 읽지 않은 알람 개수 계산
  const unreadCount = alarms.filter((alarm) => !alarm.is_read).length;

  return { alarms, unreadCount };
};
