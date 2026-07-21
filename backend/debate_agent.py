from langchain_core.messages import HumanMessage, SystemMessage
from backend.config import llm


class DebateAgent:

    def __init__(self, name, position, expertise):
        self.name = name
        self.position = position
        self.expertise = expertise
        self.arguments = []

    def make_argument(self, topic, round_number, opponent_argument=""):

        system_prompt = f"""
You are {self.name}.

Expertise:
{self.expertise}

Position:
{self.position}

Rules:

- Be logical.
- Be persuasive.
- Respect the opponent.
- Maximum 120 words.
- Do not repeat previous arguments.
"""

        if opponent_argument:

            user_prompt = f"""
Topic:
{topic}

Opponent Argument:
{opponent_argument}

Respond with a stronger counterargument.
"""

        else:

            user_prompt = f"""
Topic:
{topic}

Give your opening statement.
"""

        response = llm.invoke(
            [
                SystemMessage(content=system_prompt),
                HumanMessage(content=user_prompt),
            ]
        )

        self.arguments.append(response.content)

        return response.content