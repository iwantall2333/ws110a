#二維陣列生成
print("game of life")

position = []#紀錄一開始設置的位置

#矩陣大小
while True:
    size = input('設定二維矩陣大小:')
    if size.isdigit():
        size=int(size)
        if size>1:
            break
        else:
            print("請輸入大於一的整數")

print("設定活細胞座標，以x=-1且y=-1表輸入結束")

#輸入值，只能輸入整數(改掉了範例檔輸入字串會bug)，>0座標
while True :
    #
    print(position)
    #
    x = input('x=')
    y = input('y=')#xy為字串
    #判斷輸入為整數(包含負數-1)
    if (x.startswith('-') and x[1:] or x).isdigit() and (y.startswith('-') and y[1:] or y).isdigit():
        x=int(x)
        y=int(y)
        if  -1 < x <size and -1< y < size:
            position.extend([[x,y]])  #插入二維元素
        elif x*y==1:#輸入-1,-1
            break
        else:
            print("請輸入符合範圍的數")
    else:
         print("請輸入整數")

print("矩陣大小為:",size,"活細胞座標為:")
for i in range(len(position)):
    print(position[i])


#跑規則_計算周圍細胞數
count = 0

def countting(x,y,a):
    for k in range(len(a)):
        if x==a[k][0] and y==a[k][1]:
            global count 
            count += 1
            break
#計算九宮格活細胞數
def doCount(x,y,a):
    countting(x-1,y-1,a)#左上角座標
    countting(x-1,y,a)#上方座標
    countting(x-1,y+1,a)#右上角座標
    countting(x,y-1,a)#左方座標
    countting(x,y+1,a)#右方座標
    countting(x+1,y-1,a)#左下角座標
    countting(x+1,y,a)#下方座標
    countting(x+1,y+1,a)#右下角座標

def checkingLive(a):##
    global count
    positionNext = []
    #對每一個活細胞作九宮格檢查
    for k in range(len(a)):
        doCount(a[k][0],a[k][1],a)###
        #global positionNext 盡量不要在函式內改global
        if(count==2 or count==3) :#符合存活條件時(不能用|)
            positionNext.extend([a[k]])#才被記錄到下一代
        count = 0
    print("checkingLive:",positionNext)
    return positionNext#debug很久
    
def checkingDeath(a,positionNext):
    match1 = 0
    global count
    for i in range(size):
        for j in range(size):
            for k in range(len(a)):
                if i==a[k][0] and j==a[k][1]:
                    match1=1
                    break
            if(match1 == 0):
                doCount(i,j,a)
                if count == 3:
                    positionNext.extend([[i,j]])
                count=0  
            match1 = 0
    print("checkingDeath:",positionNext)
    return positionNext


#印出下一代
#顯示圖
def printGraph(a):
    match = 0
    for i in range(size):
        for j in range(size):

            for k in range(len(a)):
                if i==a[k][0] and j==a[k][1]:
                    print('#',end="")
                    match=1
                    break

            if match==0:    #非活細胞座標
                print('-',end="")
            match=0
        print("\n",end="")
#印出初代
printGraph(position)
print("\n",end="")

while True:#連續印出下一代
    next = input("若要觀看子代，請輸入3:")
    if next == '3':
        position=checkingDeath(position,checkingLive(position))
        print('下一代:')
        printGraph(position)
        print("\n",end="")
    else:
        break