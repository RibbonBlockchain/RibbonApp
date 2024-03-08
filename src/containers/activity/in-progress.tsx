import React from "react";
import Todo from "@/containers/dashboard/todo";
import { priorityTask, todo } from "@/lib/values/mockData";
import Survey from "@/containers/dashboard/survey";

const InProgress = () => {
  return (
    <div className="p-4 sm:p-6 ">
      <div className="w-full">
        <p className="text-xs text-gradient-2 py-3 font-bold">Priority task</p>
        {priorityTask.map((i) => (
          <Todo
            key={i.id}
            score={i.score}
            reward={i.reward}
            priority={i.priority}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
          />
        ))}
      </div>

      <div className="w-full">
        <p className="text-xs text-gradient-2 pt-5 pb-3 font-bold">
          To do List
        </p>
        {todo.map((i) => (
          <Todo
            key={i.id}
            score={i.score}
            reward={i.reward}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
            ratings={i.ratings}
            ratingsLevel={i.ratingsLevel}
          />
        ))}
      </div>

      <div className="w-full">
        <p className="text-xs text-gradient-2 pt-5 pb-3 font-bold">
          Exclusive Surveys
        </p>
        <Survey />
        <Survey />
        <Survey />
      </div>
    </div>
  );
};

export default InProgress;