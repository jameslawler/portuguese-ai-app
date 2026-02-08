import type { FC } from "hono/jsx";

import { User } from "../../types/auth";
import { ScenarioSession } from "../../types/scenario-session";

const ScenarioModal: FC<{
  user: User;
  sessions: ScenarioSession[];
}> = async (props: { user: User; sessions: ScenarioSession[] }) => {
  return (
    <div class="flex flex-col">
      <form hx-post="/api/v1/scenarios/sessions">
        <input type="text" name="type" value="bus-driver" />
        <button
          type="submit"
          class="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:cursor-pointer"
        >
          Start Scenario
        </button>
      </form>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.sessions.map((session) => (
          <>
            <span>{session.id}</span>
            <form
              hx-post={`/api/v1/ai/scenarios/${session.id}`}
              hx-target="#chat-stream"
              hx-swap="beforeend"
            >
              <input
                type="text"
                name="message"
                value="What is the capital of Portugal?"
              />
              <button
                type="submit"
                class="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:cursor-pointer"
              >
                Go
              </button>
            </form>
          </>
        ))}
      </div>
      <div id="chat-stream">Hello</div>
    </div>
  );
};

export default ScenarioModal;
