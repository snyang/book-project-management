import os
import re


def main() -> None:
    path = os.path.abspath(os.path.dirname(__file__))

    enum_directory(os.path.join(path,  "src"))
    # format_file(os.path.join(
    #     path, '..', "docs/processes/2-05-release-manager.md"))


def enum_directory(path):
    for root, directories, files in os.walk(path):
        for name in files:
            if name.endswith(".md"):
                format_file(os.path.join(root, name))


def format_file(path: str):
    """
    格式化 markdown 文档，对多行文字，增加两个空格，以保证在渲染后仍然是多行。
    逻辑：
    - 跳过代码块，数学公式块。

    Args:
        path (str): markdown 文件路径
    """
    # 普通文字行
    pattern_special = r"^\s*[^\s#!|-].*$"
    pattern_bullet_number = r"\s*\d+.*$"
    pattern_block_begin = r"^\s*```[a-zA-Z0-9]+$"
    pattern_block_end = r"^\s*```$"
    pattern_math_begin = r"^\$\$$"
    pattern_math_end = r"^\$\$$"
    data = read_file(path)
    lines = data.split("\n")
    changed = False
    row = -1
    stop = False
    for line in lines:
        row += 1
        if not stop:
            result = re.match(pattern_block_begin, line)
            if result:
                stop = True
                continue
            result = re.match(pattern_math_begin, line)
            if result:
                stop = True
                continue
        if stop:
            result = re.match(pattern_block_end, line)
            if result:
                stop = False
                continue
            result = re.match(pattern_math_end, line)
            if result:
                stop = False
                continue
            continue

        # 本行是空行，不用改变（会自动换行）
        if len(line.strip()) == 0:
            continue

        # 最后一行不用改变
        if row == len(lines)-1:
            break

        next_line = lines[row+1]
        if len(next_line.strip()) == 0:
            # 下一行是空行，不用改变（会自动换行）
            continue
        
        # 下一行是数字行，不用改变（会自动换行）
        result = re.match(pattern_bullet_number, next_line)
        if result:
            continue

        result = re.match(pattern_special, next_line)
        if result and len(line) - len(line.rstrip(" ")) != 2:
            # 确保文字行以2个空格结尾
            lines[row] = line.rstrip(" ") + "  "
            changed = True
            print(result)

    if changed:
        write_file(path, "\n".join(lines))


def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        data = file.read()
        return data


def write_file(path: str, data: str) -> None:
    print(path)
    with open(path, "w", encoding="utf-8") as file:
        file.write(data)


if __name__ == "__main__":
    main()

    # import os
    # src_dir = os.path.dirname(os.path.abspath(__file__))
    # format_file(os.path.join(src_dir, "test.md"))
