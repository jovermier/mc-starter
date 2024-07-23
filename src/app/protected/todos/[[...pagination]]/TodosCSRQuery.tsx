'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useGetTodosQuery } from '~/generated/graphql';
import TodoItem, { type Todo } from '~/components/todo-item';

const TodosCSR = () => {
  const pageString = useSearchParams().get('page');
  const page = pageString ? parseInt(pageString) : 0;

  const queryRes = useGetTodosQuery({
    variables: {
      offset: page * 10,
      limit: 10,
    },
  });

  const todos = queryRes.data?.todos;

  const count = queryRes.data?.todos_aggregate?.aggregate?.count;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl">CSR Todos Query ({count ?? '-'})</h2>
        <button
          onClick={() => queryRes.refetch()}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Query Refresh
        </button>
      </div>

      <ul className="space-y-1">
        {todos?.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        {queryRes.loading && <li>Query Loading...</li>}
      </ul>

      {count && count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page - 1}`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page + 1}`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default TodosCSR;
