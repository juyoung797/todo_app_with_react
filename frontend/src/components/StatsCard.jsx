import { BarChart3, CheckCircle, Circle } from "lucide-react";

const StatsCard = ({ stats }) => {
  console.log(stats);

  const completionRate =
    stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : "-";

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-blue-600">전체</p>
            <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="text-sm text-green-600">완료</p>
            <p className="text-2xl font-bold text-green-800">
              {stats.completed}
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border-orange-200">
        <div className="flex items-center gap-3">
          <Circle className="text-orange-600" size={24} />
          <div>
            <p className="text-sm text-orange-600">진행중</p>
            <p className="text-2xl font-bold text-orange-800">
              {stats.pending}
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border-purple-200">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-gray-50 text-xs font-bold">
            %
          </div>
          <div>
            <p className="text-sm text-purple-600">진행중</p>
            <p className="text-2xl font-bold text-purple-800">
              {completionRate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCard;
