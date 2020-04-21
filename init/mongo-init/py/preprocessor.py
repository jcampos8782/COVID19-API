from preprocessors import *


def main():
    print("Processing downloads...")
    regions.process_downloads()
    contacts.process_downloads()
    facts.process_downloads()
    intl.process_downloads()
    mx.process_downloads()
    us.process_downloads()
    print("Complete!")


if __name__ == '__main__':
    main()
