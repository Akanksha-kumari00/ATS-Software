function ApplicationPagination() {
  return (
    <div className="flex items-center justify-between p-5 border-t">
      <div className="flex gap-3">
        <button className="w-10 h-10 border rounded-lg">
          ❮
        </button>
        <button className="w-10 h-10 rounded-lg bg-blue-600 text-white">
          1
        </button>
        <button className="w-10 h-10 border rounded-lg">
          2
        </button>
        <button className="w-10 h-10 border rounded-lg">
          3
        </button>
        <button className="w-10 h-10 border rounded-lg">
          4
        </button>
        <button className="w-10 h-10 border rounded-lg">
          5
        </button>
        <button className="w-10 h-10 border rounded-lg">
          ...
        </button>
        <button className="w-10 h-10 border rounded-lg">
          16
        </button>
        <button className="w-10 h-10 border rounded-lg">
          ❯
        </button>
      </div>
    </div>
  );
}

export default ApplicationPagination;