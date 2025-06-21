type TabNavProps<T extends string> = {
  selectedTab: T;
  onTabChange: (tab: T) => void;
  tabLabels: Record<T, string>;
};

const SpartaTabNav = <T extends string>({ selectedTab, onTabChange, tabLabels }: TabNavProps<T>) => {
  return (
    <div className="flex gap-5 ">
      {(Object.keys(tabLabels) as T[]).map((tab) => (
        <div key={tab} onClick={() => onTabChange(tab)} className="text-xl cursor-pointer">
          <p className={`${selectedTab === tab ? "text-primary-400" : "text-gray-100"} font-DungGeunMo`}>
            {tabLabels[tab]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SpartaTabNav;
