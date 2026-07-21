import argparse

from backend.debate import run_debate


def main():

    parser = argparse.ArgumentParser(
        description="AI Debate Agent"
    )

    parser.add_argument(
        "--topic",
        default="Artificial Intelligence will replace software engineers.",
        help="Debate Topic",
    )

    parser.add_argument(
        "--rounds",
        type=int,
        default=2,
        help="Number of Debate Rounds",
    )

    args = parser.parse_args()

    run_debate(
        args.topic,
        args.rounds,
    )


if __name__ == "__main__":
    main()