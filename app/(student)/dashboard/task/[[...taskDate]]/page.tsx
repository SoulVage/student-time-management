import Link from "next/link";
const page = async ({ params }) => {
  const { taskDate } = await params;
  const taskDateFormat = taskDate?.[0]
    ? taskDate[0].replaceAll("-", "/")
    : false;
  return (
    <>
      {taskDateFormat && <div>found</div>}
      {!taskDateFormat && (
        <div>
          <img
            src="/not-found.png"
            alt=""
            className="w-130 h-80 object-cover"
          />
          <h2 className="font-black">
            پیداش نکردیم!{" "}
            <Link
              href="/dashboard/calender"
              className="text-orange-500 underline underline-offset-13 mr-2"
            >
              برگشت به تقویم
            </Link>
          </h2>
        </div>
      )}
    </>
  );
};

export default page;
