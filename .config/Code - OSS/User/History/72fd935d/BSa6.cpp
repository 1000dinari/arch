#include<iostream>
using namespace std;
int mult(int x, int y)
{
    int result;
    result = 0;
    while(y!=0)
    {
        result=result+x;
        y=y-1;
    }
    return (result);
}
int main()
{
    int x=9, y=6;
    cout<<mult(x,y);
    return 0;
    // foo<float, 3>(y);
}