import asyncio

from backend.debate_agent import DebateAgent
from backend.judge import DebateJudge


async def run_debate_stream(topic: str, rounds: int = 3):

    pro = DebateAgent(
        name="Dr. Alex Chen",
        position="FOR",
        expertise="AI Research Scientist",
    )

    con = DebateAgent(
        name="Prof. Sarah Martinez",
        position="AGAINST",
        expertise="Technology Policy Expert",
    )

    judge = DebateJudge()

    history = []

    last_pro = ""
    last_con = ""

    for round_number in range(1, rounds + 1):

        ############################
        # PRO THINKING
        ############################

        yield {
            "type": "thinking",
            "round": round_number,
            "agent": "FOR",
            "name": pro.name,
        }

        await asyncio.sleep(0.8)

        pro_argument = pro.make_argument(
            topic,
            round_number,
            last_con,
        )

        yield {
            "type": "argument",
            "round": round_number,
            "agent": "FOR",
            "text": pro_argument,
        }

        await asyncio.sleep(0.5)

        ############################
        # AGAINST THINKING
        ############################

        yield {
            "type": "thinking",
            "round": round_number,
            "agent": "AGAINST",
            "name": con.name,
        }

        await asyncio.sleep(0.8)

        con_argument = con.make_argument(
            topic,
            round_number,
            pro_argument,
        )

        yield {
            "type": "argument",
            "round": round_number,
            "agent": "AGAINST",
            "text": con_argument,
        }

        history.append(
            {
                "round": round_number,
                "for": pro_argument,
                "against": con_argument,
            }
        )

        last_pro = pro_argument
        last_con = con_argument

        yield {
            "type": "round_complete",
            "round": round_number,
        }

    ############################
    # Judge
    ############################

    yield {
        "type": "judge_thinking"
    }

    await asyncio.sleep(1)

    verdict = judge.evaluate(
        topic,
        pro,
        con,
    )

    yield {
        "type": "verdict",
        "verdict": verdict,
        "history": history,
    }