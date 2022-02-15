import pandas as pd

df_list = pd.read_excel('..\..\投稿申し込み関係\第5回ビジュアリゼーションワークショップポスター発表申し込みフォーム（回答）_20220215.xlsx')

#print(df_list)

lines = []

for index, row in df_list.iterrows():
    print(index+1)    
    a_line = f'\t\t\t<strong><font size=+1>(P{index+1}) {row["タイトル"]}</strong></font>\r'
    lines.append(a_line)

    a_line = f'\t\t\t<a href="./poster/visws2022-p{index+1}.pdf" target=_blank>(PDF)</a>\r'
    lines.append(a_line)

    lines.append('\t\t\t<br>\r')

    a_line = f'\t\t\t{row["著者（複数いるときはカンマで区切る）"]}<br>\r'
    a_line = a_line.replace('、', '，')
    lines.append(a_line)

    lines.append('\t\t\t<font size=-1 color=#888888>\r')

    a_line = f'\t\t\t　{row["概要（目安として200字程度）"]}\r'
    a_line = a_line.replace('、', '，')
    a_line = a_line.replace('。', '．')
    lines.append(a_line)

    lines.append('\t\t\t</font><br><br><br>\r')

    with open('..\..\投稿申し込み関係\list_html.txt', mode='w') as f:
        f.writelines(lines)