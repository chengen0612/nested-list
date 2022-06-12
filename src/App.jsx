import { toLocaleString, toLocaleRelativeString } from "@/utils/dateTime";

import NestedList from "@/components/NestedList";
import Avatar from "@/components/Avatar";

import post from "@/resource/post.json";

export default function App() {
  return (
    <div className="bg-gray-200">
      <article className="mx-auto max-w-screen-sm border border-gray-300 bg-white px-8">
        <section className="my-6">
          <div className="flex items-center gap-x-4">
            <Avatar src={post.user.avatar} alt={post.user.name} diameter={60} />
            <div className="flex flex-col">
              <strong className="text-xl">{post.user.name}</strong>
              <span className="text-md text-gray-500">
                {toLocaleString(post.create_time)}
              </span>
            </div>
          </div>
          <p className="mt-2 whitespace-pre">{post.content}</p>
        </section>
        <div className="h-[1px] bg-gray-200" />
        <section className="my-6">
          <NestedList
            data={post.comments}
            Item={Comment}
            recurseKey="comments"
            indentation={44}
          />
        </section>
      </article>
    </div>
  );
}

function Comment({ item: comment }) {
  return (
    <div className="flex items-start gap-x-3 py-2">
      <Avatar
        src={comment.user.avatar}
        alt={comment.user.name}
        diameter={32}
        className="mt-1"
      />
      <div>
        <div className="inline-flex flex-col rounded-2xl bg-gray-100 p-2">
          <strong>{comment.user.name}</strong>
          <span className="whitespace-pre">{comment.content}</span>
        </div>
        <div className="mt-1 pl-1 text-gray-700">
          {toLocaleRelativeString(comment.create_time)}
        </div>
      </div>
    </div>
  );
}
