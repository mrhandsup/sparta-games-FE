import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRegisterGameList } from "../../api/direct";
import AdminListItem from "../../components/adminComponents/AdminListItem";
import { TCategoryListResponse, TGameAdminData } from "../../types";
import SpartaPagination from "../../spartaDesignSystem/SpartaPagination";
import { getGameCategory } from "../../api/game";
import Switch from "@mui/material/Switch";
import { FaSearch } from "react-icons/fa";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import useModalToggles from "../../hook/useModalToggles";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import AdminLogsModal from "../../components/adminComponents/AdminLogsModal";

const AdminGameLog = () => {
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<number[]>([]);
  const [keyword, setKeyWord] = useState<string>("");
  const [state, setState] = useState<number | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<number | undefined>(undefined);

  const GAME_LOG_MODAL = "gameLogModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([GAME_LOG_MODAL]);

  const makeQuery = () => {
    let query = "";
    if (category.length > 0) {
      query += category.map((item) => "categories=" + item).join("&") + "&";
    }
    if (keyword) {
      query += "keyword=" + keyword + "&";
    }
    if (state !== undefined) {
      query += "state=" + state + "&";
    }
    return query;
  };

  const adminGameList = useQuery({
    queryKey: ["adminGameList", page, makeQuery()],
    queryFn: () => getRegisterGameList("limit=8&page=" + page + "&" + makeQuery()),
  });

  const { data } = useQuery<TCategoryListResponse>({
    queryKey: ["gameCategory"],
    queryFn: getGameCategory,
  });

  const totalCount = (adminGameList?.data?.pagination !== null && adminGameList?.data?.pagination.count) || 0;

  const checkAll = () => {
    setCategory(data?.data.map((item) => item.id) || []);
  };

  const selectGame = (pk: number) => {
    setSelectedGame(pk);
    onClickModalToggleHandlers[GAME_LOG_MODAL]();
  };

  const onCloseModal = () => {
    setSelectedGame(undefined);
    onClickModalToggleHandlers[GAME_LOG_MODAL]();
  };

  useEffect(() => {
    if (data) {
      checkAll();
    }
  }, [data]);

  return (
    <div className="flex flex-col px-24 py-20 gap-5">
      <div className="flex gap-10 w-full">
        <div className="w-[20%] bg-gray-800 rounded-3xl p-4 text-white text-center h-fit">
          <div className="w-full bg-gray-400 flex items-center justify-between text-primary-500 p-6 rounded-3xl font-bold text-xl mb-2">
            <p>ALL</p>
            <p>{totalCount}</p>
          </div>
          <div className="flex flex-col px-6">
            {data?.data.map((item, idx) => (
              <div key={idx} className="text-left text-body-18 mb-1 flex items-center gap-2 justify-between py-2">
                <p>{item.name}</p>
                <Switch
                  checked={category.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory([...category, item.id]);
                    } else {
                      setCategory(category.filter((i) => i !== item.id));
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-white w-full p-2 rounded-xl bg-gray-700 mb-2 cursor-pointer" onClick={() => checkAll()}>
            All
          </div>
          <div
            className="text-white w-full p-2 rounded-xl bg-gray-700 mb-2 cursor-pointer"
            onClick={() => {
              setCategory([]);
            }}
          >
            Reset
          </div>
        </div>
        <div className="w-[80%] bg-gray-800 rounded-3xl p-10 text-white text-center flex flex-col gap-3">
          <div className="flex items-center mb-3 gap-3">
            <div className="w-full border-gray-100 rounded-lg h-10 border-[1px] border-solid items-center flex px-4 ">
              <FaSearch className="text-gray-100 mr-3" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full bg-transparent focus:outline-none text-gray-100"
              />
            </div>
            <div className="flex gap-1">
              <SpartaButton
                content="전체"
                colorType="grey"
                type={state == undefined ? "filled" : "standard"}
                size="small"
                width="w-[60px]"
                onClick={() => setState(undefined)}
              />
              <SpartaButton
                content="검수"
                colorType="alert"
                type={state == 0 ? "filled" : "standard"}
                size="small"
                width="w-[60px]"
                onClick={() => setState(0)}
              />
              <SpartaButton
                content="승인"
                colorType="primary"
                size="small"
                width="w-[60px]"
                type={state == 1 ? "filled" : "standard"}
                onClick={() => setState(1)}
              />
              <SpartaButton
                content="반려"
                colorType="error"
                type={state == 2 ? "filled" : "standard"}
                size="small"
                width="w-[60px]"
                onClick={() => setState(2)}
              />
            </div>
          </div>
          {adminGameList?.data?.data.map((item: TGameAdminData, idx: number) => (
            <AdminListItem key={idx} idx={idx} item={item} onClickShowMore={selectGame} isDetail />
          ))}
          {!adminGameList?.data?.data.length && (
            <p className="text-white font-DungGeunMo text-heading-28 flex items-center justify-center w-full py-24">
              검색 결과가 없습니다.
            </p>
          )}
          <SpartaPagination dataTotalCount={totalCount} countPerPage={8} onChangePage={(e, page) => setPage(page)} />
        </div>
      </div>
      {selectedGame && (
        <SpartaModal
          isOpen={modalToggles[GAME_LOG_MODAL]}
          onClose={onCloseModal}
          modalId={GAME_LOG_MODAL}
          title="게임 로그"
          closeOnClickOutside
        >
          <AdminLogsModal game_id={selectedGame} />
        </SpartaModal>
      )}
    </div>
  );
};

export default AdminGameLog;
