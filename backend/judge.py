from langchain_core.messages import HumanMessage, SystemMessage
from backend.config import llm


class DebateJudge:

    def evaluate(self, topic, pro, con):

        pro_text = "\n\n".join(pro.arguments)

        con_text = "\n\n".join(con.arguments)

        response = llm.invoke(
            [
                SystemMessage(
                    content="""
You are an unbiased debate judge.

Evaluate both debaters.

Return:

1. Winner
2. Score (/10)
3. Strongest FOR argument
4. Strongest AGAINST argument
5. Final balanced conclusion
"""
                ),
                HumanMessage(
                    content=f"""
Topic:
{topic}

FOR:

{pro_text}

----------------------

AGAINST:

{con_text}
"""
                ),
            ]
        )

        return response.content