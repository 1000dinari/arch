#include<iostream>
#include<bits/stdc++.h>
using namespace std;
void Maths(int val2, queue val1)
{
    val1.push(0);
    val1.push(1);
    for(int val3=0; val3<val2; val3++)
    {
        int var1 = val1.pop();
        int var2=val1.pop();
        val1.push(var2);
        val1.push(var1+var2);
        cout<<var1<<endl;
    }
};

int main()
{
    queue val1;
    Maths(89,val1);
}