import { useEffect, useRef, useState } from "react";
import { TAlarmList } from "../types";
import { userStore } from "../share/store/userStore";
import { patchReadAlarm } from "../api/alarm";

export const useNotifications = () => {
  const [alarms, setAlarms] = useState<TAlarmList[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const { userData } = userStore();

  const baseUrl = import.meta.env.VITE_PROXY_HOST;

  const protocol = baseUrl.startsWith("https") ? "wss" : "ws";
  const wsUrl = new URL("ws/notifications/", baseUrl);
  wsUrl.protocol = protocol;

  useEffect(() => {
    if (!userData) return;

    const token = sessionStorage.getItem("accessToken");
    const socket = new WebSocket(wsUrl.toString(), ["access_token", token!]);
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

  const handleAlarmClick = async (alarmId: number) => {
    try {
      await patchReadAlarm(alarmId);
      setAlarms((prev) => prev.map((alarm) => (alarm.id === alarmId ? { ...alarm, is_read: true } : alarm)));
    } catch (err) {
      console.error(err);
    }
  };

  // 읽지 않은 알람 개수 계산
  const unreadCount = alarms.filter((alarm) => !alarm.is_read).length;

  return { handleAlarmClick, unreadCount };
};
